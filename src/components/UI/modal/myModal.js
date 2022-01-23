import cls from './MyModal.module.css'

const MyModal = ({ children, visible, setVisible }) => {
	const rootClasses = (!visible)
		? [cls.my_modal]
		: [cls.my_modal, cls.active]
    return (
        <>
        <div className={ cls.modal_blinder }></div>

        <div className = {rootClasses.join(' ')}
			// onClick = { () => setVisible(false) }
        >   
            <div className={ cls.modal_wrap }>
                <div className={ cls.modal_content }
                    onClick = { (e) => e.stopPropagation() }
                >
                    { children }
                </div>
            </div>
        </div>

        <div className={ cls.modal_blinder }></div>
        </>
	)
}

export default MyModal;
