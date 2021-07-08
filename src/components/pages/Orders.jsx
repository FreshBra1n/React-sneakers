import axios from "axios"
import React from "react"
import Card from "../Card/Card"

function Orders() {

    
    const [orders, setOrders] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('https://60e0612e6b689e001788ca49.mockapi.io/orders')
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
                setIsLoading(false)
            } catch (e) {
               
                console.log(e)
            }
        })();
    })

    return (
        <div className='content  p-40'>
            <div className='d-flex align-center mb-40 justify-between'>
                <h1> Мои заказы </h1>
            </div>
            <div className='d-flex flex-wrap'>
                {(isLoading ? [...Array(8)] : orders).map((item, index) => {
                    return <Card
                        key={index}
                        loading={isLoading}
                        {...item}

                    />
                })}
            </div>
        </div>
    )
}

export default Orders