function toVec3(obj) {
    if (typeof obj.x === 'function') {
        // 假设是 Vec3 对象（有 x(), y(), z() 方法）
        return {
            x: obj.x(),
            y: obj.y(),
            z: obj.z()
        };
    }
    // 否则认为是普通对象
    return { x: obj.x, y: obj.y, z: obj.z };
}
/**
 * 计算从向量 from 指向向量 to 的方向角
 * @param {Object} from 起点向量，包含 x, y, z 属性
 * @param {Object} to   终点向量，包含 x, y, z 属性
 * @returns {Object} {pitch: number, yaw: number} 俯仰和偏航，单位为弧度
 */
function directionAngles(from, to) {
    // 计算差值向量
    let dx = to.x - from.x;
    let dy = to.y - from.y;
    let dz = to.z - from.z;

    // 水平距离（忽略 Y 轴）
    let horizontal = Math.sqrt(dx * dx + dz * dz);

    // 处理重合点的情况（方向未定义，返回 0）
    if (horizontal === 0 && dy === 0) {
        return { pitch: 0, yaw: 0 };
    }

    // 计算偏航角（yaw）：水平方向相对于 Z 轴的角度
    // atan2(dx, dz) 返回从正 Z 轴（南方）起算，逆时针为正的角度
    let yaw = Math.atan2(dx, dz);

    // 计算俯仰角（pitch）：与水平面的夹角，向上为负，向下为正
    let pitch = Math.atan2(dy, horizontal);

    return [ pitch, yaw ];
}

/**
 * 将向量 v 绕 Y 轴旋转 yaw 弧度，再绕 X 轴旋转 pitch 弧度。
 * 旋转遵循右手定则，长度保持不变。
 * 
 * @param {Object} v       原始向量，包含 x, y, z 属性
 * @param {number} yaw     偏航角（弧度），正值为逆时针（从正 Z 轴转向正 X 轴）
 * @param {number} pitch   俯仰角（弧度），正值为向上（从水平面转向 +Y 方向）
 * @returns {Object}       旋转后的新向量 {x, y, z}
 */
function rotateVector(v, yaw, pitch) {
    // 第一步：绕 Y 轴旋转 yaw
    let cosYaw = Math.cos(yaw);
    let sinYaw = Math.sin(yaw);
    let x1 = v.x * cosYaw + v.z * sinYaw;
    let y1 = v.y;
    let z1 = -v.x * sinYaw + v.z * cosYaw;

    // 第二步：绕 X 轴旋转 pitch（注意：使用 -pitch 使正值向上）
    let cosPitch = Math.cos(pitch);
    let sinPitch = Math.sin(pitch);
    let x2 = x1;
    let y2 = y1 * cosPitch + z1 * sinPitch;
    let z2 = -y1 * sinPitch + z1 * cosPitch;
    let pos = Vec3(x2,y2,z2)

    return pos;
}

/**
 * 计算两个向量之间的空间夹角（弧度）
 * @param {Object} v1 第一个向量 {x, y, z}
 * @param {Object} v2 第二个向量 {x, y, z}
 * @returns {number} 夹角（弧度），范围 [0, π]
 */
function angleBetweenScalar(v1, v2) {
    let dot = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    let len1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z);
    let len2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y + v2.z * v2.z);
    if (len1 === 0 || len2 === 0) return 0; // 零向量夹角定义为0
    const cos = dot / (len1 * len2);
    // 防止浮点误差导致超出[-1,1]
    let result=Math.acos(Math.min(1, Math.max(-1, cos)));
    return result
}

/**
 * 计算两个向量之间的方向角差（Δyaw, Δpitch）
 * @param {Object} v1 第一个向量 {x, y, z}
 * @param {Object} v2 第二个向量 {x, y, z}
 * @returns {Object} {yawDiff, pitchDiff} 差值（弧度），yawDiff已归一化到 [-π, π]
 */
function angleBetweenVectors(v1, v2) {
    // 计算两个向量的方向角
    let getAngles = (v) => {
        let horizontal = Math.sqrt(v.x * v.x + v.z * v.z);
        if (horizontal === 0 && v.y === 0) {
            // 零向量无定义方向，返回零
            return { yaw: 0, pitch: 0 };
        }
        return {
            yaw: Math.atan2(v.x, v.z),   // 注意：atan2(dx, dz) 符合Minecraft坐标系
            pitch: Math.atan2(v.y, horizontal)
        };
    };

    let a1 = getAngles(v1);
    let a2 = getAngles(v2);

    let yawDiff = a2.yaw - a1.yaw;
    // 将yaw差归一化到 [-π, π]
    while (yawDiff > Math.PI) yawDiff -= 2 * Math.PI;
    while (yawDiff < -Math.PI) yawDiff += 2 * Math.PI;

    let pitchDiff = a2.pitch - a1.pitch;

    let result =[ yawDiff, pitchDiff ]

    return result;
}