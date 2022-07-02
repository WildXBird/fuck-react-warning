import { Jsonable } from "ts-extend"


export const ReactWarn2Warn = (ignore?: boolean, topThis?: (typeof window)) => {
    const types: Jsonable<any> = {}

    const env = topThis || globalThis || window || global
        ; ((native) => {
            globalThis.console.error = (...arg) => {
                const err = arg[0]
                if (String(err).startsWith("Warning:")) {
                    if (!ignore) {
                        console.warn(...arg)
                    }
                } else {
                    native(...arg)
                }
            }
        })(env.console.error);

}