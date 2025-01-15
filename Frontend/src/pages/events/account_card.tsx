
const AccountCard = () => {
    return (
            <div className="flex flex-col w-full h-full justify-center p-5 items-center">
                <div className="shadow-lg gap-5 border border-gray-100 p-5 rounded-xl flex flex-col">
                    <div className="flex gap-2 border-b border-gray-300 justify-between">
                        <h1>Account Name</h1>
                        <p>John Doe</p>
                    </div>
                    <div className="flex gap-2 border-b border-gray-300 justify-between">
                        <h1>Account Type</h1>
                        <h1>User</h1>
                    </div>
                </div>
            </div>
        )
}


export default AccountCard