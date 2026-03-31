function Ready(){
    return(
        <div className="w-full mx-auto mt-28  text-center px-4 bg-linear-to-r from-purple-600 to-indigo-600 py-36 text-white">
            <h1 className="text-3xl md:text-4xl text-white md:text-5xl font-bold">Ready to Transform Your Workflow?</h1>
            <p className="mt-4 text-white">Join thousands of professionals who are already using Digitools to work smarter.Start your free trial today.</p>

            <div className="flex flex-row gap-4 items-center justify-center">
                <button className="bg-white text-purple-600 mt-10 py-4 px-6 rounded-full font-medium hover:bg-white hover:text-purple-600 transition-colors">Explore Products</button>
                <button className="bg-transparent border border-white text-white mt-10 py-4 px-6 rounded-full font-medium hover:bg-white hover:text-purple-600 transition-colors">View Pricing</button>
            </div>
            <p className="mt-4 text-white">14-day free trial • No credit card required • Cancel anytime</p>
        </div>
    )
}
export default Ready;