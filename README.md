User
	firstName
	lastName
	email
	password
	id
	

End Point => /api/user

GET 	=> / 					=> Retrieve All User List
POST	=> /signup 				=> Sign up user and login
POST	=> /login				=> Login user
PATCH	=> /updatePassword/:id	=> Update the password
DELETE	=> /:id					=> Delete the user

	
place
	name
	description
	location
	id
	createdBy
	
End Point => /api/places

GET 	=> / 					=> Retrieve All Place List
POST	=> /user/	 			=> Retrieve all places createdBy by the user
GET	=> /:id						=> get particular place by place Id
PATCH	=> /:id					=> Update the place based on place Id
DELETE	=> /:id					=> Delete the place based on place Id
PUT		=> /					=> Create new place
