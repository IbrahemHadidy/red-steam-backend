/**
 * Password reset template
 * @param resetToken
 * @param username
 * @returns The HTML content of the password reset template
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "passwordReset", {
    enumerable: true,
    get: function() {
        return passwordReset;
    }
});
const passwordReset = (resetToken, username)=>`
<div
  style="
    padding: 0 !important;
    margin: 0 auto !important;
    display: block !important;
    min-width: 100% !important;
    width: 100% !important;
    background: #ffffff;
  "
>
  <center>
    <table
      width="100%"
      border="0"
      cellspacing="0"
      cellpadding="0"
      style="margin: 0; padding: 0; width: 100%; height: 100%"
      bgcolor="#ffffff"
      class="m_-3683762602484950757gwfw"
    >
      <tbody>
        <tr>
          <td
            style="margin: 0; padding: 0; width: 100%; height: 100%"
            align="center"
            valign="top"
          >
            <table
              width="775"
              border="0"
              cellspacing="0"
              cellpadding="0"
              class="m_-3683762602484950757m-shell"
            >
              <tbody>
                <tr>
                  <td
                    class="m_-3683762602484950757td"
                    style="
                      width: 775px;
                      min-width: 775px;
                      font-size: 0pt;
                      line-height: 0pt;
                      padding: 0;
                      margin: 0;
                      font-weight: normal;
                    "
                  >
                    <table
                      width="100%"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="m_-3683762602484950757mpy-35 m_-3683762602484950757mpx-15"
                            bgcolor="#212429"
                            style="padding: 80px"
                          >
                            <table
                              width="100%"
                              border="0"
                              cellspacing="0"
                              cellpadding="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      font-size: 0pt;
                                      line-height: 0pt;
                                      text-align: left;
                                      padding-bottom: 45px;
                                    "
                                  >
                                    <a
                                      href={FRONT_URL}
                                      target="_blank"
                                    >
                                      <img
                                        src="https://lh3.googleusercontent.com/d/1mC93yxxJ1fsoXbRSe34mjaiTs_Xxsw72"
                                        width="615"
                                        height="88"
                                        border="0"
                                        alt="Steam"
                                        class="CToWUd"
                                        data-bit="iit"
                                      />
                                    </a>
                                  </td>
                                </tr>

                                <tr>
                                  <td>
                                    <table
                                      width="100%"
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            style="
                                              font-size: 36px;
                                              line-height: 42px;
                                              font-family: Arial, sans-serif,
                                                'Motiva Sans';
                                              text-align: left;
                                              padding-bottom: 30px;
                                              color: #bfbfbf;
                                              font-weight: bold;
                                            "
                                          >
                                            Your username is <strong>${username}</strong>,
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>

                                    <table
                                      width="100%"
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            style="
                                              font-size: 28px;
                                              line-height: 36px;
                                              font-family: Arial, sans-serif,
                                                'Motiva Sans';
                                              text-align: left;
                                              color: #ffffff;
                                              padding-bottom: 30px;
                                            "
                                          >
                                            <strong
                                              >Please click the link below if you want to reset your password:</strong
                                            >
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>

                                    <table
                                      width="100%"
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td style="padding-bottom: 20px">
                                            <table
                                              width="100%"
                                              border="0"
                                              cellspacing="0"
                                              cellpadding="0"
                                              bgcolor="#17191c"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    class="m_-3683762602484950757mpx-20"
                                                    align="center"
                                                    style="
                                                      padding-top: 35px;
                                                      padding-bottom: 35px;
                                                      padding-left: 56px;
                                                      padding-right: 56px;
                                                    "
                                                  >
                                                    <table
                                                      width="400"
                                                      border="0"
                                                      cellspacing="0"
                                                      cellpadding="0"
                                                      class="m_-3683762602484950757mw-auto"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            class="m_-8039607341492451087btn-18 m_-8039607341492451087l-grey4"
                                                            bgcolor="#235ecf"
                                                            style="
                                                              font-size: 18px;
                                                              line-height: 22px;
                                                              font-family: Arial,
                                                                sans-serif,
                                                                'Motiva Sans';
                                                              text-align: center;
                                                              border-radius: 5px;
                                                              letter-spacing: 1px;
                                                              background: linear-gradient(
                                                                90deg,
                                                                #3a9bed 0%,
                                                                #235ecf 100%
                                                              );
                                                              color: #f1f1f1;
                                                              text-transform: uppercase;
                                                            "
                                                          >
                                                            <a
                                                              href="{FRONT_URL}/reset-password/${resetToken}"
                                                              style="
                                                                display: block;
                                                                padding: 13px
                                                                  35px;
                                                                text-decoration: none;
                                                                color: #f1f1f1;
                                                              "
                                                              target="_blank"
                                                            >
                                                              <span
                                                                style="
                                                                  text-decoration: none;
                                                                  color: #f1f1f1;
                                                                "
                                                                >Resume
                                                                Recovery&nbsp;&nbsp;&nbsp;</span
                                                              >
                                                            </a>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </center>
</div>
`;

//# sourceMappingURL=password-reset.js.map