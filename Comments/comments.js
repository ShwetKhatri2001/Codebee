const socketio = require("socket.io");
const Comment = require('../models/comment');
const CourseItem = require("../models/CourseItems");

module.exports.setupSocket = (server) => {
    const io = socketio(server, {
        cors: {
            origin: process.env.DOMAIN_NAME,
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        io.emit("connected");
        socket.on("join", async (room) => {
            socket.join(room);
            io.emit("roomJoined", room);
        });

        socket.on("message", async (data) => {
            const { courseItem_id, user, text } = data;
            const timestamp = Date.now();
            const queryParams = {
                text: text,
                timestamp: timestamp,
                user_id: user._id,
                courseItem_id: courseItem_id
            };
            const comment = await Comment.create(queryParams);
            await CourseItem.findByIdAndUpdate(courseItem_id, {
                $push: { childComments: comment._id }
            });
            const newComment = {
                user,
                comment,
            }
            io.in(courseItem_id).emit("newComment", newComment);
        });

        socket.on("deleteMessage", async data => {
            const { comment_id, courseItem_id } = data
            await Comment.findByIdAndDelete(comment_id)
            const courseItem = await CourseItem.findById(courseItem_id)
            courseItem.childComments = courseItem.childComments.filter(id => id !== comment_id)
            await courseItem.save()
            io.in(courseItem_id).emit("deletedMessage", { comment_id });
        });

        socket.on("like", async data => {
            const { comment_id, courseItem_id, user } = data
            const comment = await Comment.findByIdAndUpdate(comment_id, {
                $inc: { likes: 1 },
                $push: { likers: user._id }
            }, { new: true });
            io.in(courseItem_id).emit("likedmessage", comment);
        });

        socket.on("dislike", async data => {
            const { comment_id, courseItem_id, user } = data
            const comment = await Comment.findByIdAndUpdate(comment_id, {
                $inc: { dislikes: 1 },
                $push: { dislikers: user._id }
            }, { new: true });
            io.in(courseItem_id).emit("dislikedmessage", comment);
        });

        socket.on("typing", (data) => {
            if (data.typing == true)
                io.in(data.courseItem_id).emit('display', data)
            else
                io.in(data.courseItem_id).emit('display', data)
        })
    });
};

