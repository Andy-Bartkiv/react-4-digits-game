import cls from './SideSlider.module.css'

const SideSlider = ({ children, visible }) => {
	const rootClasses = (!visible)
		? [cls.my_modal]
		: [cls.my_modal, cls.active]
    return (
        <>
        <div className={ cls.modal_blinder }></div>

        <div className = {rootClasses.join(' ')}>   
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

export default SideSlider;
