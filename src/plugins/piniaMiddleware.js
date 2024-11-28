export function createPiniaMiddleware() {
    return (context) => {
        context.store.$onAction(({ name, store, args, after, onError }) => {
            console.log(
                `Action "${name}" in store "${store.$id}" with args:`,
                args
            )

            let userRole = localStorage.getItem('role')
            let protectedActions = ['addItem', 'updateItem', 'deleteItem']

            if (protectedActions.includes(name) && userRole !== 'ADMIN') {
                console.error(
                    `Unauthorized action "${name}" attempted by role "${userRole}"`
                )
                throw new Error('Unauthorized')
            }

            after((result) => {
                console.log(`Action "${name}" completed with result:`, result)
            })

            onError((error) => {
                console.error(`Action "${name}" failed with error:`, error)
            })
        })
    }
}