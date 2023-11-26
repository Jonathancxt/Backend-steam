import {Post} from '../repository/posts.repo';
import {v4 as uuidv4} from 'uuid';
import { OK } from '../util/responseCodes';
import {Request, Response} from 'express';

export const handleCreatePost = async (req: Request, res: Response, next: any) => {
    try {
        const {title, content, author, image_url} = req.body.postsTO;
        console.log("Creating post")
        console.log("Title", title)
        console.log("Content", content)
        console.log("Author", author)
        const post = new Post({
            uuid: uuidv4(),
            title: title,
            content: content,
            author: author,
            image_url: image_url,
        });
        await post.save();
        res.status(OK).json(post);
    } catch (err) {
        next(err);
    }
};

export const handleGetAllPosts = async (req: Request, res: Response, next: any) => {
    try {
        const posts = await Post.find({});
        res.json(posts);
    } catch (err) {
        next(err);
    }
};

export const handleGetPostByPagination = async (req: Request, res: Response, next: any) => {
    try {
        let {pageParam, limit} = req.body.postsTO;
        if (!pageParam) {
            pageParam = 1;
        }

        if (!limit) {
            limit = 2;
        }

        const result = await Post.find({})
            .sort({createdAt: 'desc'})
            .limit(limit)
            .skip((pageParam - 1) * limit)
            .exec();


        res.status(OK).json({result});
    } catch (err) {
        next(err);
    }
}
