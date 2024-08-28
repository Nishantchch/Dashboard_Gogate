import IndexHeader from 'components/Headers/IndexHeader'
import React from 'react'
import img from '../../assets/img/logo/mail.png'
import img1 from '../../assets/img/logo/gogates.png'

const Verified = () => {
  return (
    <>
      <IndexHeader />
      <div style={{ marginTop: "5%", display: "flex", justifyContent: "space-between", marginLeft: "2%" }}>
        <div style={{}}>
          <img src={img1} style={{ width: "8vw", marginBottom: "5%" }} />
          <h2>Your Mail Is Verified Successfully </h2>

        </div>
        <img src={img} style={{ width: "25vw", }} />

      </div>


    </>
  )
}

export default Verified