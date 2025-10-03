import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const TeacherDashboard = () => {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsLoggedIn(true);
    } else {
      alert('Неверный пароль!');
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#0a0a0f',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px'
      }}>
        <Card style={{ 
          width: '100%', 
          maxWidth: '400px',
          background: '#1a1a2e',
          border: '1px solid #00d9ff'
        }}>
          <CardHeader>
            <CardTitle style={{ 
              textAlign: 'center', 
              color: '#00d9ff',
              fontSize: '24px'
            }}>
              <Icon name="Lock" size={40} style={{ margin: '0 auto 10px' }} />
              <div>Вход для преподавателя</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '15px' }}>
                <Input
                  type="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ 
                    background: '#0a0a0f', 
                    border: '1px solid #00d9ff',
                    color: 'white'
                  }}
                  required
                />
                <p style={{ 
                  fontSize: '12px', 
                  color: '#888', 
                  marginTop: '5px' 
                }}>
                  Пароль: admin
                </p>
              </div>
              <Button 
                type="submit" 
                style={{ 
                  width: '100%',
                  background: '#00d9ff',
                  color: '#0a0a0f'
                }}
              >
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0a0a0f',
      padding: '20px',
      color: 'white'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{ 
            fontSize: '32px', 
            color: '#00d9ff' 
          }}>
            Панель управления
          </h1>
          <Button
            onClick={() => setIsLoggedIn(false)}
            style={{ background: '#333', color: 'white' }}
          >
            Выйти
          </Button>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <Card style={{ background: '#1a1a2e', border: '1px solid #00d9ff' }}>
            <CardHeader>
              <CardTitle style={{ fontSize: '14px', color: '#888' }}>
                Общая выручка
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#00d9ff' }}>
                326,544 ₽
              </div>
            </CardContent>
          </Card>

          <Card style={{ background: '#1a1a2e', border: '1px solid #00d9ff' }}>
            <CardHeader>
              <CardTitle style={{ fontSize: '14px', color: '#888' }}>
                Всего продаж
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#00d9ff' }}>
                156
              </div>
            </CardContent>
          </Card>

          <Card style={{ background: '#1a1a2e', border: '1px solid #00d9ff' }}>
            <CardHeader>
              <CardTitle style={{ fontSize: '14px', color: '#888' }}>
                Новых заказов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#00d9ff' }}>
                12
              </div>
            </CardContent>
          </Card>
        </div>

        <Card style={{ background: '#1a1a2e', border: '1px solid #00d9ff', marginBottom: '20px' }}>
          <CardHeader>
            <CardTitle style={{ color: '#00d9ff' }}>Последние заказы</CardTitle>
          </CardHeader>
          <CardContent>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <th style={{ padding: '10px', textAlign: 'left', color: '#888' }}>№</th>
                  <th style={{ padding: '10px', textAlign: 'left', color: '#888' }}>Клиент</th>
                  <th style={{ padding: '10px', textAlign: 'left', color: '#888' }}>Игра</th>
                  <th style={{ padding: '10px', textAlign: 'left', color: '#888' }}>Сумма</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <td style={{ padding: '10px' }}>001</td>
                  <td style={{ padding: '10px' }}>user@mail.ru</td>
                  <td style={{ padding: '10px' }}>Cyber Nexus 2084</td>
                  <td style={{ padding: '10px', color: '#00d9ff' }}>1,999 ₽</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <td style={{ padding: '10px' }}>002</td>
                  <td style={{ padding: '10px' }}>gamer@net.ru</td>
                  <td style={{ padding: '10px' }}>Neon Velocity</td>
                  <td style={{ padding: '10px', color: '#00d9ff' }}>1,499 ₽</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <td style={{ padding: '10px' }}>003</td>
                  <td style={{ padding: '10px' }}>player@cyber.net</td>
                  <td style={{ padding: '10px' }}>Digital Warfare</td>
                  <td style={{ padding: '10px', color: '#00d9ff' }}>2,499 ₽</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card style={{ background: '#1a1a2e', border: '1px solid #00d9ff' }}>
          <CardHeader>
            <CardTitle style={{ color: '#00d9ff' }}>Популярные игры</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ 
                padding: '15px', 
                background: '#0a0a0f', 
                borderRadius: '8px',
                border: '1px solid #333'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '10px'
                }}>
                  <strong>Cyber Nexus 2084</strong>
                  <span style={{ color: '#00d9ff' }}>45 продаж</span>
                </div>
                <div style={{ color: '#888', fontSize: '14px' }}>
                  Выручка: 112,455 ₽
                </div>
              </div>

              <div style={{ 
                padding: '15px', 
                background: '#0a0a0f', 
                borderRadius: '8px',
                border: '1px solid #333'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '10px'
                }}>
                  <strong>Matrix Protocol</strong>
                  <span style={{ color: '#00d9ff' }}>51 продаж</span>
                </div>
                <div style={{ color: '#888', fontSize: '14px' }}>
                  Выручка: 91,749 ₽
                </div>
              </div>

              <div style={{ 
                padding: '15px', 
                background: '#0a0a0f', 
                borderRadius: '8px',
                border: '1px solid #333'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '10px'
                }}>
                  <strong>Neon Velocity</strong>
                  <span style={{ color: '#00d9ff' }}>32 продажи</span>
                </div>
                <div style={{ color: '#888', fontSize: '14px' }}>
                  Выручка: 60,768 ₽
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
