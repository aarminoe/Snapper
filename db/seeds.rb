# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
User.create(username:'test', password: '12345678', password_confirmation: '12345678', avatar_url: 'data:image/jpeg;base64,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', bio: 'this is my bio hello!')
Post.create(title: 'test', image_url: 'data:image/jpeg;base64,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', user_id: 1)
Comment.create(comment: 'hi', who_commented: 'test2', who_commented_avatar_url: 'no', post_id: 1)
CommentReply.create(reply: 'bye', who_commented: 'test', who_commented_avatar_url: 'no', comment_id: 1)
Follower.create(who_followed: 'me', who_followed_avatar_url: 'no', user_id: 1)
PostLike.create(post_id:1)
Conversation.create(sender:'anotherme')
UserConversation.create(user_id: 1, conversation_id: 1)
Message.create(message: 'testing', conversation_id: 1)
MessageReply.create(reply: 'tested', message_id:1)