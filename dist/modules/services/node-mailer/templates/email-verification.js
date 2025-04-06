/**
 * Email verification template
 * @param verificationToken
 * @param username
 * @returns The HTML content of the email verification template
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "emailVerification", {
    enumerable: true,
    get: function() {
        return emailVerification;
    }
});
const emailVerification = (verificationToken, username)=>`
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
      class="m_-8039607341492451087gwfw"
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
              class="m_-8039607341492451087m-shell"
            >
              <tbody>
                <tr>
                  <td
                    class="m_-8039607341492451087td"
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
                            class="m_-8039607341492451087mpy-35 m_-8039607341492451087mpx-15"
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
                                        src="https://ci3.googleusercontent.com/meips/ADKq_NZ9VaflsCh1ddbhLqbwx_I2JgwSVe7geJxRqDIy2XKgdDfSxWn3CETHHi-3w2HEvQLlX35Py3ADciq7jJNS-3dnDBV3bm3Wk-so2EAd2mkTZkZ7Po6QjCSSoB4kKCBWprLB=s0-d-e1-ft#https://store.cloudflare.steamstatic.com/public/shared/images/email/logo.png"
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
                                              >To continue creating your new
                                              Red-Steam account, please verify your
                                              email address below.</strong
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
                                                    class="m_-8039607341492451087mpx-20"
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
                                                      class="m_-8039607341492451087mw-auto"
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
                                                              href="{FRONT_URL}/verify-account/?token=${verificationToken}&username=${username}"
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
                                                                >Verify My Email
                                                                Address&nbsp;&nbsp;&nbsp;</span
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
                                              font-size: 18px;
                                              line-height: 25px;
                                              font-family: Arial, sans-serif,
                                                'Motiva Sans';
                                              text-align: left;
                                              color: #7abefa;
                                              padding-bottom: 40px;
                                            "
                                          >
                                            If you didn't recently attempt to
                                            create a new account with this email
                                            address, you can safely disregard
                                            this email.
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

//# sourceMappingURL=email-verification.js.map