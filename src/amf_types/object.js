var AMFType = require('./base_type')
var AMFString = require('./string')

class AMFObject extends AMFType {
  constructor(type, value, options = { propertyEncoder: () => new Buffer(0), endType: 0x00 }) {
    super(type)
    this.value = value
    this.endType = options.endType
    this.propertyEncoder = options.propertyEncoder
  }
  encode() {
    const keys = Object.keys(this.value)
    const properties = keys.map(key => Buffer.concat([
      new AMFString(undefined, key).encode(),
      this.propertyEncoder.encode(this.value[key])
    ]))
    return Buffer.concat([
      super.encode(Buffer.concat(properties)),
      new Buffer([0, 0, this.endType])
    ])
  }
}

module.exports = AMFObject