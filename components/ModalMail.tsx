"use client";

import * as React from "react";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { addUserEmailToProduct } from "@/lib/actions";
import { Inter } from "next/font/google";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    // bgcolor: "background.paper",
    // border: "2px solid #000",
    // boxShadow: 24,
    // p: 4,
};

interface Props {
    productId: string;
}

const ModalMail = ({ productId }: Props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        await addUserEmailToProduct(productId, email);

        setIsSubmitting(false);
        setEmail("");
        handleClose();
    };

    return (
        <>
            <Button onClick={handleOpen} className="btn" type="button">
                Track
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div className="dialog-content">
                            <div className="flex flex-col">
                                <div className="flex justify-between">
                                    <div className="p-3 border border-gray-200">
                                        <Image
                                            src="/assets/icons/logo.svg"
                                            alt="logo"
                                            width={28}
                                            height={28}
                                        />
                                    </div>

                                    <Image
                                        src="/assets/icons/x-close.svg"
                                        alt="close"
                                        width={24}
                                        height={24}
                                        className="cursor-pointer"
                                        onClick={handleClose}
                                    />
                                </div>

                                <h4 className="dialog-head_text">
                                    Stay updated with product pricing alerts
                                    right in your inbox!
                                </h4>

                                <p className="text-sm text-gray-600 mt-2">
                                    Never miss a bargain again with our timely
                                    alerts!
                                </p>

                                <form
                                    className="flex flex-col mt-5"
                                    onSubmit={handleSubmit}
                                >
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Email Address
                                    </label>
                                    <div className="dialog-input_container">
                                        <Image
                                            src="/assets/icons/mail.svg"
                                            alt="mail"
                                            height={18}
                                            width={18}
                                        />
                                        <input
                                            required
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            placeholder="Enter your email address"
                                            className="dialog-input"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="dialog-btn"
                                    >
                                        {isSubmitting
                                            ? "Submitting..."
                                            : "Track"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default ModalMail;
