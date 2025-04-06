/**
 * Payment confirmation template
 * @param accountName The name of the account
 * @param orderId The order id of the payment
 * @param currentDate The current date
 * @param totalPrice The total price of the payment
 * @param gameCards The generated template of the game cards
 * @returns The HTML content of the payment confirmation template
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    gameCard: function() {
        return gameCard;
    },
    paymentConfirmation: function() {
        return paymentConfirmation;
    }
});
const paymentConfirmation = (accountName, orderId, currentDate, totalPrice, gameCards)=>`
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
      class="m_-3456850176708683179gwfw"
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
              class="m_-3456850176708683179m-shell"
            >
              <tbody>
                <tr>
                  <td
                    class="m_-3456850176708683179td"
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
                            class="m_-3456850176708683179mpy-35 m_-3456850176708683179mpx-15"
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
                                            Hello ${accountName}
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
                                              >Thank you for your recent
                                              transaction on Red Steam.</strong
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
                                          <td
                                            style="padding-top: 10px"
                                            colspan="3"
                                          ></td>
                                        </tr>
                                        <tr>
                                          <td
                                            style="
                                              font-family: 'Motiva Sans', Arial,
                                                sans-serif;
                                              padding-top: 10px;
                                              padding-bottom: 20px;
                                              color: #ffffff;
                                              font-size: 14px;
                                              text-transform: uppercase;
                                            "
                                          >
                                            The items below has been added to you Red Steam Library.
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>

                                    ${gameCards}

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
                                              padding-bottom: 10px;
                                              padding-top: 10px;
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
                                                  <th
                                                    class="m_-3456850176708683179column-top"
                                                    valign="top"
                                                    width="375"
                                                    bgcolor="#17191c"
                                                    style="
                                                      font-size: 0pt;
                                                      line-height: 0pt;
                                                      padding: 0;
                                                      margin: 0;
                                                      font-weight: normal;
                                                      vertical-align: top;
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
                                                            style="
                                                              padding: 15px;
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
                                                                    style="
                                                                      padding-bottom: 5px;
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
                                                                            valign="top"
                                                                            width="140"
                                                                            style="
                                                                              font-size: 12px;
                                                                              line-height: 18px;
                                                                              font-family: 'Motiva Sans',
                                                                                Arial,
                                                                                sans-serif;
                                                                              text-align: left;
                                                                              color: #f1f1f1;
                                                                            "
                                                                          >
                                                                            Account
                                                                            name:
                                                                          </td>
                                                                          <td
                                                                            valign="top"
                                                                            width="10"
                                                                            style="
                                                                              font-size: 0pt;
                                                                              line-height: 0pt;
                                                                              text-align: left;
                                                                            "
                                                                          ></td>
                                                                          <td
                                                                            valign="top"
                                                                            class="m_-3456850176708683179mt-right"
                                                                            style="
                                                                              font-size: 12px;
                                                                              line-height: 18px;
                                                                              font-family: 'Motiva Sans',
                                                                                Arial,
                                                                                sans-serif;
                                                                              text-align: left;
                                                                              color: #f1f1f1;
                                                                            "
                                                                          >
                                                                            <strong
                                                                              >${accountName}</strong
                                                                            >
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td
                                                                    style="
                                                                      padding-bottom: 5px;
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
                                                                            valign="top"
                                                                            width="140"
                                                                            style="
                                                                              font-size: 12px;
                                                                              line-height: 18px;
                                                                              font-family: 'Motiva Sans',
                                                                                Arial,
                                                                                sans-serif;
                                                                              text-align: left;
                                                                              color: #f1f1f1;
                                                                            "
                                                                          >
                                                                            Invoice:
                                                                          </td>
                                                                          <td
                                                                            valign="top"
                                                                            width="10"
                                                                            style="
                                                                              font-size: 0pt;
                                                                              line-height: 0pt;
                                                                              text-align: left;
                                                                            "
                                                                          ></td>
                                                                          <td
                                                                            valign="top"
                                                                            class="m_-3456850176708683179mt-right"
                                                                            style="
                                                                              font-size: 12px;
                                                                              line-height: 18px;
                                                                              font-family: 'Motiva Sans',
                                                                                Arial,
                                                                                sans-serif;
                                                                              text-align: left;
                                                                              color: #f1f1f1;
                                                                            "
                                                                          >
                                                                            <strong
                                                                              >${orderId}</strong
                                                                            >
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td
                                                                    style="
                                                                      padding-bottom: 5px;
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
                                                                            valign="top"
                                                                            width="140"
                                                                            style="
                                                                              font-size: 12px;
                                                                              line-height: 18px;
                                                                              font-family: 'Motiva Sans',
                                                                                Arial,
                                                                                sans-serif;
                                                                              text-align: left;
                                                                              color: #f1f1f1;
                                                                            "
                                                                          >
                                                                            Date
                                                                            issued:
                                                                          </td>
                                                                          <td
                                                                            valign="top"
                                                                            width="10"
                                                                            style="
                                                                              font-size: 0pt;
                                                                              line-height: 0pt;
                                                                              text-align: left;
                                                                            "
                                                                          ></td>
                                                                          <td
                                                                            valign="top"
                                                                            class="m_-3456850176708683179mt-right"
                                                                            style="
                                                                              font-size: 12px;
                                                                              line-height: 18px;
                                                                              font-family: 'Motiva Sans',
                                                                                Arial,
                                                                                sans-serif;
                                                                              text-align: left;
                                                                              color: #f1f1f1;
                                                                            "
                                                                          >
                                                                            <strong
                                                                              >${currentDate}</strong
                                                                            >
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
                                                  </th>
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
                                            class="m_-3456850176708683179mpb-35"
                                            style="padding-bottom: 10px"
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
                                                    bgcolor="#3a9aed"
                                                    style="
                                                      padding: 15px;
                                                      padding-bottom: 10px;
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
                                                          <th
                                                            class="m_-3456850176708683179column"
                                                            width="285"
                                                            style="
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
                                                                    style="
                                                                      padding-bottom: 5px;
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
                                                                            valign="top"
                                                                            width="140"
                                                                            style="
                                                                              font-size: 12px;
                                                                              line-height: 18px;
                                                                              font-family: 'Motiva Sans',
                                                                                Arial,
                                                                                sans-serif;
                                                                              text-align: left;
                                                                              color: #f1f1f1;
                                                                            "
                                                                          >
                                                                            Payment
                                                                            method:
                                                                          </td>
                                                                          <td
                                                                            valign="top"
                                                                            width="10"
                                                                            style="
                                                                              font-size: 0pt;
                                                                              line-height: 0pt;
                                                                              text-align: left;
                                                                            "
                                                                          ></td>
                                                                          <td
                                                                            valign="top"
                                                                            class="m_-3456850176708683179mt-right"
                                                                            style="
                                                                              font-size: 12px;
                                                                              line-height: 18px;
                                                                              font-family: 'Motiva Sans',
                                                                                Arial,
                                                                                sans-serif;
                                                                              text-align: left;
                                                                              color: #f1f1f1;
                                                                            "
                                                                          >
                                                                            <strong
                                                                              >PayPal</strong
                                                                            >
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </th>
                                                          <th
                                                            class="m_-3456850176708683179column-top m_-3456850176708683179mpb-10"
                                                            valign="top"
                                                            width="10"
                                                            style="
                                                              font-size: 0pt;
                                                              line-height: 0pt;
                                                              padding: 0;
                                                              margin: 0;
                                                              font-weight: normal;
                                                              vertical-align: top;
                                                            "
                                                          ></th>
                                                          <th
                                                            class="m_-3456850176708683179column"
                                                            style="
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
                                                                    style="
                                                                      padding-bottom: 5px;
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
                                                                            valign="top"
                                                                            width="200"
                                                                            style="
                                                                              font-size: 12px;
                                                                              line-height: 18px;
                                                                              font-family: 'Motiva Sans',
                                                                                Arial,
                                                                                sans-serif;
                                                                              text-align: left;
                                                                              color: #f1f1f1;
                                                                            "
                                                                          >
                                                                            Your
                                                                            total
                                                                            for
                                                                            this
                                                                            transaction:
                                                                          </td>
                                                                          <td
                                                                            valign="top"
                                                                            width="10"
                                                                            style="
                                                                              font-size: 0pt;
                                                                              line-height: 0pt;
                                                                              text-align: left;
                                                                            "
                                                                          ></td>
                                                                          <td
                                                                            valign="top"
                                                                            class="m_-3456850176708683179mt-right"
                                                                            style="
                                                                              font-size: 16px;
                                                                              line-height: 22px;
                                                                              font-family: 'Motiva Sans',
                                                                                Arial,
                                                                                sans-serif;
                                                                              text-align: left;
                                                                              color: #f1f1f1;
                                                                            "
                                                                          >
                                                                            <strong
                                                                              >\$${totalPrice}</strong
                                                                            >
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </th>
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
                                              color: #dbdbdb;
                                              padding-bottom: 30px;
                                            "
                                          >
                                            This email message will serve as
                                            your receipt.
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
                                          <td style="padding-top: 30px">
                                            <table
                                              width="100%"
                                              border="0"
                                              cellspacing="0"
                                              cellpadding="0"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    width="3"
                                                    bgcolor="#3a9aed"
                                                    style="
                                                      font-size: 0pt;
                                                      line-height: 0pt;
                                                      text-align: left;
                                                    "
                                                  ></td>
                                                  <td
                                                    width="37"
                                                    style="
                                                      font-size: 0pt;
                                                      line-height: 0pt;
                                                      text-align: left;
                                                    "
                                                  ></td>
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
                                                              font-size: 16px;
                                                              line-height: 22px;
                                                              font-family: Arial,
                                                                sans-serif,
                                                                'Motiva Sans';
                                                              text-align: left;
                                                              padding-top: 20px;
                                                              padding-bottom: 20px;
                                                              color: #f1f1f1;
                                                            "
                                                          >
                                                            Cheers,<br />
                                                            Creator of Red Steam<br />
                                                            Hope you've enjoyed your experience with Red Steam!
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
const gameCard = (gameName, gamePrice, gameImage)=>`
<table
  width="100%"
  border="0"
  cellspacing="0"
  cellpadding="0"
>
  <tbody>
    <tr>
      <td style="padding-top: 10px">
        <table
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
        >
          <tbody>
            <tr>
              <td
                bgcolor="#393e47"
                style="padding: 15px"
              >
                <table
                  width="100%"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <tbody>
                    <tr>
                      <th
                        class="m_-3456850176708683179column"
                        width="184"
                        style="
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
                                class="m_-3456850176708683179fluid-img"
                                style="
                                  font-size: 0pt;
                                  line-height: 0pt;
                                  text-align: left;
                                "
                              >
                                <img
                                  src="${gameImage}"
                                  width="184"
                                  height="69"
                                  border="0"
                                  alt=""
                                  class="CToWUd"
                                  data-bit="iit"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </th>
                      <th
                        class="m_-3456850176708683179column m_-3456850176708683179mpb-15"
                        width="15"
                        style="
                          font-size: 0pt;
                          line-height: 0pt;
                          padding: 0;
                          margin: 0;
                          font-weight: normal;
                        "
                      ></th>
                      <th
                        class="m_-3456850176708683179column"
                        width="200"
                        style="
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
                                class="m_-3456850176708683179mt-left"
                                style="
                                  font-size: 17px;
                                  line-height: 22px;
                                  font-family: 'Motiva Sans',
                                    Arial,
                                    sans-serif;
                                  text-align: left;
                                  color: #ffffff;
                                "
                              >
                                <strong
                                  >${gameName}<br
                                /></strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </th>
                      <th
                        class="m_-3456850176708683179column m_-3456850176708683179mpb-15"
                        width="15"
                        style="
                          font-size: 0pt;
                          line-height: 0pt;
                          padding: 0;
                          margin: 0;
                          font-weight: normal;
                        "
                      ></th>
                      <th
                        class="m_-3456850176708683179column"
                        style="
                          vertical-align: middle;
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
                                class="m_-3456850176708683179mt-left"
                                style="
                                  font-size: 18px;
                                  line-height: 20px;
                                  font-family: 'Motiva Sans',
                                    Arial,
                                    sans-serif;
                                  color: #ffffff;
                                  text-align: right;
                                "
                              >
                                <strong
                                  >
                                  \$${gamePrice}
                                  USD</strong
                                >
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </th>
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
`;

//# sourceMappingURL=payment-confirmation.js.map