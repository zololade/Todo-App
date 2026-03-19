// Types for the page data structure
export type ElementObject = {
  tag: string;
  uuid: string;
  content?: string | PageData[];
  [key: string]: unknown; // allows arbitrary HTML attributes
};
interface IdentityPacket {
  el: string;
  childUuids: string[];
  isMarkedForDeath: boolean; // Our "Virus" flag
}

export type PageData = ElementObject | PageData[] | string | number;

export default class Page {
  private static DOM_RECORD: Map<string, IdentityPacket> = new Map();

  private static isObject(value: unknown): value is ElementObject {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  static build(
    incomingObject: PageData,
  ): HTMLElement | DocumentFragment | Text {
    function cacher(val: {
      childUuid: string | null;
      uuid: string;
      tag: string;
    }) {
      const childrenUuid = Page.DOM_RECORD.get(val.uuid);
      const children = childrenUuid && childrenUuid.childUuids;
      const buildingChildrenArray = val.childUuid
        ? children
          ? [
              ...children.map((data) => {
                if (data !== val.childUuid) return data;
                return val.childUuid;
              }),
            ]
          : [val.childUuid]
        : [];

      const result: IdentityPacket = {
        el: val.tag,
        childUuids: [],
        isMarkedForDeath: false,
      };
      if (val.uuid) Page.DOM_RECORD.set(val.uuid, result);
    }

    const result = Page.buildLogic(incomingObject, cacher);
    for (const entries of Page.DOM_RECORD) {
      console.log(entries[0], entries[1]);
    }
    return result[1];
  }

  static buildLogic(
    incomingObject: PageData,
    cache: (val: {
      childUuid: string | null;
      uuid: string;
      tag: string;
    }) => void,
  ): [string | null, HTMLElement | DocumentFragment | Text] {
    let tag: string;
    let content: string | PageData[] | undefined;
    let el: HTMLElement | DocumentFragment;
    let att: Record<string, unknown>;
    let uuid: string;

    if (Page.isObject(incomingObject)) {
      ({ tag, content, uuid, ...att } = incomingObject);
      el = document.createElement(tag);
      el.dataset.uuid = uuid;

      Object.entries(att).forEach(([key, value]) => {
        const lookupKey = key === "class" ? "className" : key;
        if (lookupKey in el) {
          (el as unknown as Record<string, unknown>)[lookupKey] = value;
        } else {
          (el as HTMLElement).setAttribute(key, String(value));
        }
      });
    } else if (Array.isArray(incomingObject)) {
      content = incomingObject;
      el = document.createDocumentFragment();
    } else {
      return [null, document.createTextNode(String(incomingObject))];
    }

    if (typeof content === "string") {
      (el as HTMLElement).textContent = content;
    } else if (Array.isArray(content)) {
      content.forEach((data) => {
        const callResult = Page.buildLogic(data, cache);
        cache({
          uuid,
          childUuid: callResult[0] || null,
          tag,
        });
        el.appendChild(callResult[1]);
      });
    }

    if (Page.isObject(incomingObject)) return [incomingObject.uuid, el];
    return [null, el];
  }

  static snapshotRender(currentHost: HTMLElement, elem: PageData): void {
    // const previousRecord = Page.DOM_RECORD.get(currentHost);
    // if (
    //   previousRecord &&
    //   JSON.stringify(previousRecord) === JSON.stringify(elem)
    // )
    //   return;

    currentHost.innerHTML = "";
    const fragment = document.createDocumentFragment();
    fragment.appendChild(Page.build(elem));
    currentHost.appendChild(fragment);

    // Page.DOM_RECORD.set(currentHost, elem);
  }

  static pureRender(
    host: HTMLElement,
    elem: HTMLElement | DocumentFragment | Text,
  ) {
    host.innerHTML = "";
    const fragment = document.createDocumentFragment();
    fragment.appendChild(elem);
    host.appendChild(fragment);
  }
}
