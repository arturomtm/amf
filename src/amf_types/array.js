var AMFType = require('./base_type')

class AMFArray extends AMFType {
  constructor(type, value, options = { propertyEncoder: () => new Buffer(0) }) {
    super(type)
    this.value = value
    this.propertyEncoder = options.propertyEncoder
  }
  encodeLength() {
    const buffer = new Buffer(4)
    buffer.writeUInt32BE(this.value.length)
    return buffer
  }
  encode() {
    const value = Buffer.concat([
      this.encodeLength(), 
      this.propertyEncoder.encode(this.value)
    ])
    return super.encode(value)
  }
  static isStrict(array) {
    const keys = Object.keys(array)
    return keys.reduce((isStrict, key) => isStrict && Number.isInteger(key), true)
  }
}

module.exports = AMFArray