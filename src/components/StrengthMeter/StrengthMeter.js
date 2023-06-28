import React from 'react';
import css from './StrengthMeter.module.css';

const StrengthMeter = props => {
  const pwdValidate = props.password;
  const initPwdChecker = () => {
    let pwdCheck = 0;
    let validateRegex = ['[A-Z]', '[a-z]', '[0-9]', '\\W'];
    validateRegex.forEach((regex, i) => {
      if (new RegExp(regex).test(pwdValidate)) {
        pwdCheck += 1;
      }
    });
    switch (pwdCheck) {
      case 0:
        return {
          strength: 0,
          val: '',
        };
      case 1:
        return {
          strength: 1,
          val: 'weak',
        };
      case 2:
        return {
          strength: 2,
          val: 'fair',
        };
      case 3:
        return {
          strength: 3,
          val: 'good',
        };
      case 4:
        return {
          strength: 4,
          val: 'strong',
        };
      default:
        return null;
    }
  };

  props.actions(initPwdChecker().val);
  let strength = initPwdChecker().val;
  console.log(typeof strength);

  return (
    <>
      <div className={css.wrapper}>
        <progress
          className={`${css.pwdCheckerBar} ${css[initPwdChecker().val]}`}
          value={initPwdChecker().strength}
          max="4"
        />
        <br />
        <p>
          {props.password && (
            <div>
              <p>
                Password strength validation:
                <strong className={css[initPwdChecker().val]}>
                  {initPwdChecker().val}{' '}
                </strong>
              </p>
            </div>
          )}
        </p>
      </div>
    </>
  );
};
export default StrengthMeter;
