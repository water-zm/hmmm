export function localSave(val, key = "token") {
    window.localStorage.setItem(key, val)
}

export function localGet(key = "token") {
    return window.localStorage.getItem(key)
}

export function localRemove(key = "token") {
    window.localStorage.removeItem(key)
}