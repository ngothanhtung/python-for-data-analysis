from flask import Blueprint, jsonify

no_thue_bp = Blueprint('no_thue', __name__)


@no_thue_bp.route('/api/bao-cao/no-thue')
def bao_cao_no_thue():
    return jsonify({
        "type": "no-thue",
        "title": "Báo cáo Nợ thuế",
        "data": {
            "message": "Dữ liệu báo cáo nợ thuế"
        }
    })
