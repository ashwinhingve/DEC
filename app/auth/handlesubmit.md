// const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   const validations = {
  //     email: {
  //       regex: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
  //       message: 'Invalid email. Must be a valid Gmail address'
  //     },
  //     password: {
  //       regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //       message: 'Password must:\n- Be at least 8 characters\n- Contain letter, number, special character'
  //     },
  //     name: {
  //       minLength: 3,
  //       maxLength: 20,
  //       message: 'Name must be 3-20 characters long'
  //     }
  //   };
  
  //   if (!validations.email.regex.test(formData.email)) {
  //     alert(validations.email.message);
  //     return;
  //   }
  
  //   if (!validations.password.regex.test(formData.password)) {
  //     alert(validations.password.message);
  //     return;
  //   }
  
  //   if (!isLogin) {
  //     const nameLength = formData.name.trim().length;
  //     if (nameLength < validations.name.minLength || nameLength > validations.name.maxLength) {
  //       alert(validations.name.message);
  //       return;
  //     }
  //   }
  
  //   try {
  //     const action = isLogin ? 'login' : 'register';
  //     const apiUrl = 'https://demploymentcorner.com/api/auth_api.php';
      
  //     const response = await fetch(`${apiUrl}?action=${action}`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       credentials: 'include',
  //       mode: 'cors',
  //       body: JSON.stringify({ ...formData, role }),
  //     });
  
  //     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
  //     const data = await response.json();
      
  //     if (data.success) {
  //       if (isLogin) {
  //         sessionStorage.setItem('user', JSON.stringify({ ...data.user, role }));
  //         document.cookie = `user=${JSON.stringify({ ...data.user, role })}; path=/; max-age=3600; SameSite=Strict; Secure`;
  //         router.push(role === 'admin' ? '/admin/dashboard' : '/profile');
  //       } else {
  //         alert('Registration successful! Please login.');
  //         setIsLogin(true);
  //       }
  //     } else {
  //       alert(data.message || 'An error occurred');
  //     }
  //   } catch (error) {
  //     console.error('Authentication error:', error);
  //     alert('Authentication failed');
  //   }
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const validations = {
  //     email: {
  //       regex: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
  //       message: 'Invalid email. Must be a valid Gmail address'
  //     },
  //     password: {
  //       regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //       message: 'Password must:\n- Be at least 8 characters\n- Contain letter, number, special character'
  //     },
  //     name: {
  //       minLength: 3,
  //       maxLength: 20,
  //       message: 'Name must be 3-20 characters long'
  //     }
  //   };

  //   // Validation logic
  //   if (!validations.email.regex.test(formData.email)) {
  //     alert(validations.email.message);
  //     return;
  //   }

  //   if (!validations.password.regex.test(formData.password)) {
  //     alert(validations.password.message);
  //     return;
  //   }

  //   if (!isLogin) {
  //     const nameLength = formData.name.trim().length;
  //     if (nameLength < validations.name.minLength || nameLength > validations.name.maxLength) {
  //       alert(validations.name.message);
  //       return;
  //     }
  //   }

  //   try {
  //     const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
  //     const response = await axios.post(endpoint, formData);

  //     if (response.data.success) {
  //       if (isLogin) {
  //         // Store user info and token
  //         localStorage.setItem('user', JSON.stringify(response.data.user));
  //         localStorage.setItem('token', response.data.token);
          
  //         // Redirect based on role
  //         switch(response.data.user.role) {
  //           case 'admin':
  //             router.push('/admin/dashboard');
  //             break;
  //           case 'user':
  //             router.push('/profile');
  //             break;
  //           default:
  //             router.push('/dashboard');
  //         }
  //       } else {
  //         alert('Registration successful! Please login.');
  //         setIsLogin(true);
  //       }
  //     }
  //   } catch (error) {
  //     alert(error.response?.data?.message || 'An error occurred');
  //   }
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   const validations = {
  //     email: {
  //       regex: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
  //       message: 'Invalid email. Must be a valid Gmail address'
  //     },
  //     password: {
  //       regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //       message: 'Password must:\n- Be at least 8 characters\n- Contain letter, number, special character'
  //     },
  //     name: {
  //       minLength: 3,
  //       maxLength: 20,
  //       message: 'Name must be 3-20 characters long'
  //     }
  //   };
  
  //   // Email validation
  //   if (!validations.email.regex.test(formData.email)) {
  //     alert(validations.email.message);
  //     return;
  //   }
  
  //   // Password validation
  //   if (!validations.password.regex.test(formData.password)) {
  //     alert(validations.password.message);
  //     return;
  //   }
  
  //   // Name validation for registration
  //   if (!isLogin) {
  //     const nameLength = formData.name.trim().length;
  //     if (nameLength < validations.name.minLength || nameLength > validations.name.maxLength) {
  //       alert(validations.name.message);
  //       return;
  //     }
  //   }
  
  //   try {
  //     const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
  //     const response = await axios.post(endpoint, {
  //       ...formData,
  //       role
  //     });
  
  //     if (response.data.success) {
  //       if (isLogin) {
  //         // Store user information
  //         localStorage.setItem('user', JSON.stringify(response.data.user));
  //         localStorage.setItem('token', response.data.token);
          
  //         // // Role-based routing
  //         // switch(response.data.user.role) {
  //         //   case 'admin':
  //         //     router.push('/admin/dashboard');
  //         //     break;
  //         //   case 'user':
  //         //     router.push('/profile');
  //         //     break;
  //         //   default:
  //         //     router.push('/profile');
  //         // }
           
  //         router.push(
  //           response.data.user.role === 'admin' 
  //             ? '/admin' 
  //             : '/profile'
  //         );
  //       } else {
  //         alert('Registration successful! Please login.');
  //         setIsLogin(true);
  //       }
  //     }
  //   } catch (error) {
  //     alert(error.response?.data?.message || 'Authentication failed');
  //     console.error('Authentication Error:', error);
  //   }
  // };

