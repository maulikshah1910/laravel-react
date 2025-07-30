
type Props = {
    label?: string;
};

const SubmitButton = ({
    label = 'Submit'
}: Props) => {
    return (
        <button 
            type="submit" 
            className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition-colors">
            {label}
        </button>
    );
}

export default SubmitButton;