import express from 'express'

import {z} from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {prisma} from './db'//talk to prisma

const app= express();

app.use(express.json());

//validate the schema 
app.get("/",(req:express.Request,res:express.Response)=>{
        console.log("backend is running very well");
        res.status(200).json({message:"backend is running very well"});
})
const signupSchema=z.object(
    {
        username:z.string().min(3).max(20),
        password:z.string().min(8).max(20),
        gender:z.enum(['Male','Female','other']),
        ChannelName:z.string().min(3).max(20),
        bannner:z.string().min(3).max(20),
        profilePicture:z.string().min(3).max(20),
        description:z.string().min(3).max(20),
        
    }
)
const uploadSchema=z.object(
    {
        videoUrl:z.string().min(3).max(20),
        thumbnail:z.string().min(3).max(20),
    }
)
//get userId from token
const JWT_SECRET=process.env.JWT_SECRET||"your-secret-key";
function getUserId(req:express.Request):string|null{
    const token=req.headers.authorization?.split(' ')[1];
    if(!token) return null;
    try{
        const decoded=jwt.verify(token,JWT_SECRET) as {userId:string};
        return decoded.userId;
    }catch(error){
        return null;
    }
}
//signup endpoint
app.post('/signup', async (req:express.Request, res:express.Response) => {
    try {
        const parsed = signupSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                message: "Invalid inputs"
            });
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                username: parsed.data.username
            }
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Username already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(
            parsed.data.password,
            10
        );

        await prisma.user.create({
            data: {
                username: parsed.data.username,
                password: hashedPassword,
                gender: parsed.data.gender,
                ChannelName: parsed.data.ChannelName,
                bannner: parsed.data.bannner,
                profilePicture: parsed.data.profilePicture,
                description: parsed.data.description
            }
        });

        res.json({
            message: "User created successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});
 app.post('/signin',async(req:express.Request,res:express.Response)=>{
      const {username,password}=req.body;
      const user=await prisma.user.findFirst(
        {
            where:{
                username
            }
        })
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
    
        const matched = await bcrypt.compare(
            password,
            user.password
        );
    
        if (!matched) {
            return res.status(401).json({
                message: "Wrong password"
            });
        }
    
        const token = jwt.sign(
            {
                userId: user.id
            },
            JWT_SECRET
        );
    
        res.json({
            token
        });
    
 })
 app.post('/upload', async (req:express.Request, res:express.Response) => {
    const userId = getUserId(req);

    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const parsed = uploadSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid input"
        });
    }

    const upload = await prisma.uploads.create({
        data: {
            videoUrl: parsed.data.videoUrl,
            thumbnail: parsed.data.thumbnail,
            userId
        }
    });

    res.json(upload);
});
app.get('/videos', async (req:express.Request, res:express.Response) => {
    const videos = await prisma.uploads.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    ChannelName: true
                }
            }
        }
    });

    res.json(videos);
});
app.get('/videos/:id', async (req:express.Request, res:express.Response) => {
    const id = req.params.id;

    const video = await prisma.uploads.findUnique({
        where: {
            id: id as string | undefined
        },
        include: {
            user: true
        }
    });

    if (!video) {
        return res.status(404).json({
            message: "Video not found"
        });
    }

    res.json(video);
});
app.listen(3001, () => {
    console.log('Server is running on port 3000');
});
// what end points do we need?
//signup,sign(authorized)
//get videos(unauthorized)
//get particular video(unauthorized )
//upload video(authorized)



