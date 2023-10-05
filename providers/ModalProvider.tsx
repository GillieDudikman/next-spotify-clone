"use client"

import React, {useEffect, useState} from "react";
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import SubscribeModal from "@/components/SubscribeModal";
import {ProductWithPrice} from "@/types";

interface ModalProviderProps {
    prod: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({ prod }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    },[])

    if(!isMounted)
        return null

    return(
        <>
            <AuthModal/>
            <UploadModal/>
            <SubscribeModal prod={prod}/>
        </>
    )
}

export default ModalProvider