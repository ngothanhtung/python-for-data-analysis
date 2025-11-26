from flask import Flask, jsonify
from flask_cors import CORS
from routes.giao_ban import giao_ban_bp
from routes.to_khai import to_khai_bp
from routes.no_thue import no_thue_bp
from routes.products import products_bp
from routes.thuc_hanh import thuc_hanh_bp
from routes.hang_hoa import hang_hoa_bp

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
app.json.ensure_ascii = False

# Cấu hình CORS
CORS(app)

# Đăng ký blueprints
app.register_blueprint(giao_ban_bp)
app.register_blueprint(to_khai_bp)
app.register_blueprint(no_thue_bp)
app.register_blueprint(products_bp)
app.register_blueprint(thuc_hanh_bp)
app.register_blueprint(hang_hoa_bp)


@app.route('/')
def home():
    return jsonify({
        "message": "Hệ thống Báo cáo API",

    })


if __name__ == '__main__':
    app.run(debug=True, port=8000)
