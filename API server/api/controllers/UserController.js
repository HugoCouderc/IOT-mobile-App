/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {
 	me: function (req,res)
   {
         return  res.ok(
             { user: req.user}
         )
   },

 	getUser: function(req,res)
 	{
 		return res.ok(User.findOne({
 			id: req.param('id')
 		}).exec(function(err, user){

 			if(user){
 			}
 			return user;
 		}))

 	},


 	findUser: function(req,res)
 	{
 		Camera.find(
 			{username: {'like': '%'+req.param('search')}},
 			function(err, list)
 			{
 				return list;
 			}
 		);
 	}




 };
