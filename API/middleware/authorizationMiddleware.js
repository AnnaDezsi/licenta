export const authorizeAdmin = (req, res, next) => {
    if (req.user?.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Access denied: Admins only' });
    }

    next();
};


export const authorizeDoctor = (req, res, next) => {
    if (!(req.user?.role === 'DOCTOR' || req.user?.role === 'ADMIN')) {
        return res.status(403).json({ error: 'Access denied: Doctors only' });
    }
    next();
};

export const authorizeUserOrAdmin = (req, res, next) => {
    const isRequiredIdSameAsLoggedId = req.user.userId === +req.params.userId
    const iAdmin = req.user?.role === 'ADMIN';

    console.log("User ID from request:", req.params.userId);
    console.log("Logged user ID:", req.user.userId);

    
    console.log("Is required ID same as logged ID:", isRequiredIdSameAsLoggedId);
    console.log("Is user an admin:", iAdmin);
    
    // if (!isRequiredIdSameAsLoggedId || !iAdmin) {
    //     return res.status(403).json({ error: 'Access denied' });
    // }

    next();

};
