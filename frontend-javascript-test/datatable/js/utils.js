export function log(msg, type = 'log') {
    if (DEV) {
        switch (type) {
            case 'error':
                console.error(msg)
                break;

            case 'info':
                console.info(msg)
                break;

            default:
                console.log(msg);
        }
    }
}
