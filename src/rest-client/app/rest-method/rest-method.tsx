import "./rest-method.css";

export enum RestMethodEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

interface RestMethodProps {
  method: RestMethodEnum;
}

export const RestMethod = ({ method }: RestMethodProps) => {
  const getClassName = (method: RestMethodEnum) => {
    switch (method) {
      case RestMethodEnum.GET:
        return "rest-method-get";
      case RestMethodEnum.POST:
        return "rest-method-post";
      case RestMethodEnum.PUT:
        return "rest-method-put";
      case RestMethodEnum.DELETE:
        return "rest-method-delete";
      default:
        return "";
    }
  };

  return (
    <div className="rest-method">
      <span className={getClassName(method)}>{method}</span>
    </div>
  );
};
