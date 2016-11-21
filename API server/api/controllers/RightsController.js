/**
 * RightsCOntroller
 *
 * @description :: Server-side logic for managing Rights
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  checkRights: function (req,res)
  {
    Rights.findOne(
      {userID: req.param('userID'), camID: req.param('camID')},
      function(err, right)
      {
        return res.ok(right.permissionlevel);
      }
    );

  },


usersCamRights: function(req,res)
 	{
 		Rights.find(
 			{camID: req.param('camID')},
 			function(err, list)
 			{
 				var users=[];
 				var perms=[];
 				for(i=0; i<list.length;i++)
 				{
 					users.push(list[i].userID);
 					perms.push(list[i].permissionlevel);
 				}

 				User.find(
 					{id : users},
 					function(err, list2)
 					{
 						for(j=0; j<list2.length;j++)
 						{
 							list2[j].permission = perms[j];
 						}
 						return res.ok(list2);
 					}
 				);

 			}
 		);
 	},

  newUserRights: function(req,res)
   	{
   		User.findOne(
   			{username: req.param('username')},
   			function(err, S_user)
   			{
          console.log(S_user);
   				var userId = S_user.id;

   				Rights.create(
   					{userID : userId, camID: req.param('camID'), permissionlevel: req.param('permissionlevel')}).exec(function(err, newRight)
   					{
   						return res.ok(newRight);
   					});


   			}
   		);
   	}


}
