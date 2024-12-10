from waitress import serve
from itproject.wsgi import application  # 替换为你的项目名称
import logging

# 配置日志
logging.basicConfig(
    filename='waitress.log',
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(message)s'
)

if __name__ == '__main__':
    # 配置 Waitress, 移除 logger 参数
    serve(
        application,
        host='127.0.0.1',
        port=8000,
        threads=4,  # 根据需要调整线程数
        url_scheme='http',
        channel_timeout=300,
        cleanup_interval=30
    )