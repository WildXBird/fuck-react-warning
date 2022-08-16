import { Jsonable } from "ts-extend"


export const ReactWarn2Warn = (ignore?: boolean, topThis?: (typeof window)) => {
    const types: Jsonable<any> = {}

    const env = topThis || globalThis || window || global
        ; ((native) => {
            globalThis.console.error = (...arg) => {
                const err = arg[0]
                const str = String(err)
                if (str.startsWith("Warning:")
                    || str.startsWith("[Vue warn]")) {
                    if (!ignore) {
                        console.warn(...arg)
                    }
                } else {
                    native(...arg)
                }
            }
        })(env.console.error);

}