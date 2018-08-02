import createHTMLElement from '../js/common-service';

export const homeViewHolderId = 'container';

export function homeComponent() {
  const hComponent = createHTMLElement(
    `<div>
        <div>
            <button id="git-login" class="btn btn-success" disabled>Login With Git</button>
        </div>        
    </div>`,
  );
  return hComponent;
}
