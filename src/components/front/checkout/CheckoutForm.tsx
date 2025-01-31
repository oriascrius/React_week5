import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

// 定義表單資料的介面
interface FormData {
  email: string;
  name: string;
  tel: string;
  address: string;
  message: string;
}

function CheckoutForm() {
  const navigate = useNavigate();
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }
  } = useForm<FormData>();

  const API_BASE = import.meta.env.VITE_API_URL;
  const API_PATH = import.meta.env.VITE_API_PATH;

  // 表單提交處理
  const onSubmit = async (data: FormData) => {
    try {
      const submitData = {
        data: {
          user: {
            email: data.email,
            name: data.name,
            tel: data.tel,
            address: data.address
          },
          message: data.message
        }
      };

      const res = await axios.post(`${API_BASE}/api/${API_PATH}/order`, submitData);
      console.log('API response:', res.data);  // 檢查 API 回應
      
      if (res.data.success) {
        Swal.fire({
          icon: 'success',
          title: '訂單建立成功',
          text: '感謝您的購買！',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          // 確保使用正確的訂單 ID
          const orderId = res.data.orderId || res.data.data?.id;  // 檢查可能的 ID 位置
          console.log('Navigating with orderId:', orderId);  // 檢查導航時的 ID
          
          navigate('/success', { 
            state: { 
              orderId: orderId 
            } 
          });
        });
      }
    } catch (error) {
      console.error('訂單建立失敗:', error);
      Swal.fire({
        icon: 'error',
        title: '訂單建立失敗',
        text: '請稍後再試',
        confirmButtonText: '確定'
      });
    }
  };

  return (
    <div className="my-5 row justify-content-center">
      <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            id="email"
            type="email" 
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            {...register('email', { 
              required: '請輸入 Email',
              pattern: {
                value: /^\S+@\S+$/i,
                message: '請輸入有效的 Email 格式'
              }
            })}
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">收件人姓名</label>
          <input 
            id="name"
            type="text" 
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            {...register('name', { 
              required: '請輸入姓名',
              minLength: {
                value: 2,
                message: '姓名至少 2 個字'
              }
            })}
          />
          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="tel" className="form-label">收件人電話</label>
          <input 
            id="tel"
            type="tel" 
            className={`form-control ${errors.tel ? 'is-invalid' : ''}`}
            {...register('tel', { 
              required: '請輸入電話',
              pattern: {
                value: /^09\d{8}$/,
                message: '請輸入正確的手機號碼格式'
              }
            })}
          />
          {errors.tel && <div className="invalid-feedback">{errors.tel.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">收件人地址</label>
          <input 
            id="address"
            type="text" 
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            {...register('address', { 
              required: '請輸入地址',
              minLength: {
                value: 8,
                message: '請輸入完整地址'
              }
            })}
          />
          {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">留言</label>
          <textarea 
            id="message"
            className="form-control"
            rows={3}
            {...register('message')}
          ></textarea>
        </div>

        <div className="text-end">
          <button 
            type="submit" 
            className="btn btn-danger"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                處理中...
              </>
            ) : '送出訂單'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm; 