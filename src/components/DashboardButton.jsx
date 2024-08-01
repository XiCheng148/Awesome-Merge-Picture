const DashboardButton = ({
  onClick,
  icon,
  title,
  text,
  textClassName = '',
}) => (
  <div className='flex flex-col space-y-2 flex-1 items-center'>
    <button onClick={onClick} className='btn-circle' title={title}>
      {icon}
    </button>
    <div className={`text-sm ${textClassName}`}>{text}</div>
  </div>
);

export default DashboardButton;
