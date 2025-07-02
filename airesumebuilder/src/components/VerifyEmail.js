import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function VerifyEmail() {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            const response = await fetch('http://localhost:3000/verify/${token}',
                { method: "GET" }
            );

            if (response.redirected) {
                // Agar backend redirect kar raha hai, to frontend ko bhi navigate karwa do
                navigate("/sign-in");
            } else if (!response.ok) {
                alert("Invalid or expired verification link");
                navigate("/sign-up");
            }
        };
        verify();
    }, [token, navigate]);

    return <div>Verifying your email, please wait...</div>;
}

export default VerifyEmail;