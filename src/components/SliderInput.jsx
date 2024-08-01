import { FiSliders } from 'react-icons/fi';
import { POSITION_MAX } from '../utils/constants.js';

const SliderInput = ({ label, value, onChange }) => (
  <div className='flex flex-col space-y-2'>
    <label className='flex items-center text-sm font-medium'>
      <FiSliders className='mr-2' />
      {label}:
    </label>
    <input
      type='range'
      min='0'
      max={POSITION_MAX}
      value={value}
      onChange={e => onChange(e.target.value)}
      className='slider'
    />
  </div>
);

export default SliderInput;
