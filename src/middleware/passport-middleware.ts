import User from "../models/user";
import { Strategy, ExtractJwt } from "passport-jwt";
const opts = {
    JwtFromRequest: (ExtractJwt.fromAuthHeaderAsBearerToken()),
    secretorKey: String(process.env.JWT_SECRET),
};

export = (passport: any) => {
    passport.use(
        new Strategy(opts, async (payload: { user_id: any; }, done: (arg0: null, arg1: boolean) => any) => {
            await User.findById(payload.user_id)
                .then((user) => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false)
                }).catch((err) => {
                    return done(null, false);
                })
        })
    );
};