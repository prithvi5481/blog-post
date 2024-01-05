// import jwt from "jsonwebtoken";

// const auth = (req,res,next) => {
//     try {
//         console.log('Headers:',req.headers);
//         const authorizationHeader = req.headers.authorization;

//         if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
//             console.log('Unauthorized - Token missing or invalid format');
//             return res.status(401).json({ message: 'Unauthorized - Token missing or invalid format' });
//         }

//         const token = req.headers.Authorization.split(' ')[1];

//         let decodeData = jwt.verify(token,'test');
//         req.userId = decodeData?.id;
//         console.log('middleware userId',req.userId);
//         next();
//     } catch (error) {
//         console.log('Error in middleware setting:', error.message);
//         return res.status(401).json({ message: 'Unauthorized - Token verification failed' });
//     }
// }

// export default auth;

import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        //console.log('Headers:', req.headers);

        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader || typeof authorizationHeader !== 'string') {
            console.log('Unauthorized - Invalid Authorization header');
            return res.status(401).json({ message: 'Unauthorized - Invalid Authorization header' });
        }

        const tokenParts = authorizationHeader.split(' ');

        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            console.log('Unauthorized - Invalid token format');
            return res.status(401).json({ message: 'Unauthorized - Invalid token format' });
        }

        const token = tokenParts[1];

        let decodeData = jwt.verify(token, "test");
        req.userId = decodeData?.id;
        console.log('Middleware userId:', req.userId);
        next();
    } catch (error) {
        console.log('Error in middleware setting:', error.message);
        return res.status(401).json({ message: 'Unauthorized - Token verification failed' });
    }
};

export default auth;
