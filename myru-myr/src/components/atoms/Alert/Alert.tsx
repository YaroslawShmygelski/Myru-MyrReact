import { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const Alert = ({ url, title }:{url:string, title:string}) => {
    const navigate = useNavigate();

    const showAlert = () => {
        Swal.fire({
            title: title,
            icon: "success",
            confirmButtonColor: "#08b808",
            confirmButtonText: "OK",
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(url);
            }
        });
    };

    useEffect(() => {
        showAlert();
    }, []);

    return null;
};

