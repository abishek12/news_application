import { Post } from "../model/PostModel";

export const deletePostController = async (req,res) => {
    try {
        let post_id = req.query.post_id
        let items = await Post.findByIdAndDelete({
            _id: post_id
        })

        if (!items){
            return res.status(404).json({
                status: 404,
                message: "Post not found",
            })
        }
        return res.status(200).json({
            status: 200,
            message: "Post Deleted Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: `Error: ${error}`
        })
    }

}

