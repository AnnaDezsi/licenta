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
    if (!isRequiredIdSameAsLoggedId && req.user?.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();

};
