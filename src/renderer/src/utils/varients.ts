 const AddClientPopUpanimation = {
    initial: { y: 500 },
    start: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.2,
            delay: 0.1,
        },
    },
    exit: {
        y: 500,
        transition: {
            duration: 0.2,
            delay: 0.1,
        },
    }
}


export {AddClientPopUpanimation}