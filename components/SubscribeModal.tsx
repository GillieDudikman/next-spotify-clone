"use client"
import Modal from "@/components/Modal";
import {Price, ProductWithPrice} from "@/types";
import React, {useState} from "react";
import Button from "@/components/Button";
import {useUser} from "@/hooks/useUser";
import toast from "react-hot-toast";
import {postData} from "@/libs/helpers";
import {getStripe} from "@/libs/stripeClient";
import useSubscribeModal from "@/hooks/useSubscribeModal";

interface SubscribeModalProps{
    prod: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: 0,
    }).format((price?.unit_amount || 0 / 100))
    return priceString
}
const SubscribeModal: React.FC<SubscribeModalProps> = ({ prod }) => {
    const subscribedModal = useSubscribeModal();
    const [priceIdLoading, setPriceIdLoading] = useState<string>();
    const { user, isLoading, subscription } = useUser();

    const onChange = (open: boolean) => {
        if(!open)
            subscribedModal.onClose();
    }

    const handleCheckout = async (price: Price) => {
        setPriceIdLoading(price.id)
        if(!user){
            setPriceIdLoading(undefined);
            return toast.error("Must be logged in");
        }
        if(subscription){
            setPriceIdLoading(undefined);
            return toast("Already subscribed");
        }
        try{
            const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: { price }
            })
            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId })
        }catch(error){
            toast.error((error as Error)?.message)
        }finally {
            setPriceIdLoading(undefined)
        }
    }

    let content = (
        <div className="text-center">
            No products available
        </div>
    )

    if(prod.length){
        content = (
            <div>
                {prod.map(product => {
                    if(!product.prices?.length){
                        return(
                            <div key={product.id}>
                                No prices available
                            </div>
                        )
                    }
                    return product.prices.map(price => (
                        <Button key={price.id} onClick={() => handleCheckout(price)}
                                disabled={isLoading || price.id === priceIdLoading} className="mb-4">
                            {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
                        </Button>
                    ))
                })}
            </div>
        )
    }
    if(subscription)
        content = (
            <div className="text-center">
                Already subscribed
            </div>
        )
    return(
        <Modal isOpen={subscribedModal.isOpen} onChange={onChange} title="Only for Premium Users" description="Listen to music">
            {content}
        </Modal>
    )
}
export default SubscribeModal