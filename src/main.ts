import { Jsonable } from "ts-extend"

/** When react/Vue warns, turns to real warning, not error. */
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
                    try {
                        native(...arg)
                    } catch (error) {
                        try {
                            console.error(error)
                        } catch (error) {
                            try {
                                console.warn(error)
                            } catch (error) {
                                try {
                                    console.debug(error)
                                } catch (error) {
                                    console.log(error)
                                }
                            }
                        }

                    }

                }
            }
        })(env.console.error);

}