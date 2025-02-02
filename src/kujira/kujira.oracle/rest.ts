/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface OracleAggregateExchangeRatePrevote {
  hash?: string;
  voter?: string;

  /** @format uint64 */
  submit_block?: string;
}

/**
 * MsgAggregateExchangeRateVote - struct for voting on exchange rates.
 */
export interface OracleAggregateExchangeRateVote {
  exchange_rate_tuples?: OracleExchangeRateTuple[];
  voter?: string;
}

export interface OracleDenom {
  name?: string;
}

export interface OracleExchangeRateTuple {
  denom?: string;
  exchange_rate?: string;
}

/**
 * MsgAggregateExchangeRatePrevoteResponse defines the Msg/AggregateExchangeRatePrevote response type.
 */
export type OracleMsgAggregateExchangeRatePrevoteResponse = object;

/**
 * MsgAggregateExchangeRateVoteResponse defines the Msg/AggregateExchangeRateVote response type.
 */
export type OracleMsgAggregateExchangeRateVoteResponse = object;

/**
 * MsgDelegateFeedConsentResponse defines the Msg/DelegateFeedConsent response type.
 */
export type OracleMsgDelegateFeedConsentResponse = object;

/**
 * Params defines the parameters for the oracle module.
 */
export interface OracleParams {
  /** @format uint64 */
  vote_period?: string;
  vote_threshold?: string;
  reward_band?: string;

  /** @format uint64 */
  reward_distribution_window?: string;
  whitelist?: OracleDenom[];
  slash_fraction?: string;

  /** @format uint64 */
  slash_window?: string;
  min_valid_per_window?: string;
}

/**
* QueryActivesResponse is response type for the
Query/Actives RPC method.
*/
export interface OracleQueryActivesResponse {
  /** actives defines a list of the denomination which oracle prices aggreed upon. */
  actives?: string[];
}

/**
* QueryAggregatePrevoteResponse is response type for the
Query/AggregatePrevote RPC method.
*/
export interface OracleQueryAggregatePrevoteResponse {
  aggregate_prevote?: OracleAggregateExchangeRatePrevote;
}

/**
* QueryAggregatePrevotesResponse is response type for the
Query/AggregatePrevotes RPC method.
*/
export interface OracleQueryAggregatePrevotesResponse {
  aggregate_prevotes?: OracleAggregateExchangeRatePrevote[];
}

/**
* QueryAggregateVoteResponse is response type for the
Query/AggregateVote RPC method.
*/
export interface OracleQueryAggregateVoteResponse {
  /** MsgAggregateExchangeRateVote - struct for voting on exchange rates. */
  aggregate_vote?: OracleAggregateExchangeRateVote;
}

/**
* QueryAggregateVotesResponse is response type for the
Query/AggregateVotes RPC method.
*/
export interface OracleQueryAggregateVotesResponse {
  aggregate_votes?: OracleAggregateExchangeRateVote[];
}

/**
* QueryExchangeRateResponse is response type for the
Query/ExchangeRate RPC method.
*/
export interface OracleQueryExchangeRateResponse {
  exchange_rate?: string;
}

/**
* QueryExchangeRatesResponse is response type for the
Query/ExchangeRates RPC method.
*/
export interface OracleQueryExchangeRatesResponse {
  /** exchange_rates defines a list of the exchange rate for all whitelisted denoms. */
  exchange_rates?: V1Beta1DecCoin[];
}

/**
* QueryFeederDelegationResponse is response type for the
Query/FeederDelegation RPC method.
*/
export interface OracleQueryFeederDelegationResponse {
  feeder_addr?: string;
}

/**
* QueryMissCounterResponse is response type for the
Query/MissCounter RPC method.
*/
export interface OracleQueryMissCounterResponse {
  /** @format uint64 */
  miss_counter?: string;
}

/**
 * QueryParamsResponse is the response type for the Query/Params RPC method.
 */
export interface OracleQueryParamsResponse {
  /** params defines the parameters of the module. */
  params?: OracleParams;
}

export interface ProtobufAny {
  "@type"?: string;
}

export interface RpcStatus {
  /** @format int32 */
  code?: number;
  message?: string;
  details?: ProtobufAny[];
}

/**
* DecCoin defines a token with a denomination and a decimal amount.

NOTE: The amount field is an Dec which implements the custom method
signatures required by gogoproto.
*/
export interface V1Beta1DecCoin {
  denom?: string;
  amount?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: keyof Omit<Body, "body" | "bodyUsed">;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType) => RequestParams | void;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType = null as any;
  private securityWorker: null | ApiConfig<SecurityDataType>["securityWorker"] =
    null;
  private abortControllers = new Map<CancelToken, AbortController>();

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data;
  };

  private addQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];

    return (
      encodeURIComponent(key) +
      "=" +
      encodeURIComponent(
        Array.isArray(value)
          ? value.join(",")
          : typeof value === "number"
          ? value
          : `${value}`
      )
    );
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key]
    );
    return keys
      .map((key) =>
        typeof query[key] === "object" && !Array.isArray(query[key])
          ? this.toQueryString(query[key] as QueryParamsType)
          : this.addQueryParam(query, key)
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (
    cancelToken: CancelToken
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format = "json",
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      (secure &&
        this.securityWorker &&
        this.securityWorker(this.securityData)) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];

    return fetch(
      `${baseUrl || this.baseUrl || ""}${path}${
        queryString ? `?${queryString}` : ""
      }`,
      {
        ...requestParams,
        headers: {
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
          ...(requestParams.headers || {}),
        },
        signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      }
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = await response[format]()
        .then((data) => {
          if (r.ok) {
            r.data = data;
          } else {
            r.error = data;
          }
          return r;
        })
        .catch((e) => {
          r.error = e;
          return r;
        });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title oracle/genesis.proto
 * @version version not set
 */
export class Api<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryActives
   * @summary Actives returns all active denoms
   * @request GET:/oracle/denoms/actives
   */
  queryActives = (params: RequestParams = {}) =>
    this.request<OracleQueryActivesResponse, RpcStatus>({
      path: `/oracle/denoms/actives`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryExchangeRates
   * @summary ExchangeRates returns exchange rates of all denoms
   * @request GET:/oracle/denoms/exchange_rates
   */
  queryExchangeRates = (params: RequestParams = {}) =>
    this.request<OracleQueryExchangeRatesResponse, RpcStatus>({
      path: `/oracle/denoms/exchange_rates`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryExchangeRate
   * @summary ExchangeRate returns exchange rate of a denom
   * @request GET:/oracle/denoms/{denom}/exchange_rate
   */
  queryExchangeRate = (denom: string, params: RequestParams = {}) =>
    this.request<OracleQueryExchangeRateResponse, RpcStatus>({
      path: `/oracle/denoms/${denom}/exchange_rate`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryParams
   * @summary Params queries all parameters.
   * @request GET:/oracle/params
   */
  queryParams = (params: RequestParams = {}) =>
    this.request<OracleQueryParamsResponse, RpcStatus>({
      path: `/oracle/params`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryAggregateVote
   * @summary AggregateVote returns an aggregate vote of a validator
   * @request GET:/oracle/valdiators/{validator_addr}/aggregate_vote
   */
  queryAggregateVote = (validator_addr: string, params: RequestParams = {}) =>
    this.request<OracleQueryAggregateVoteResponse, RpcStatus>({
      path: `/oracle/valdiators/${validator_addr}/aggregate_vote`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryAggregatePrevotes
   * @summary AggregatePrevotes returns aggregate prevotes of all validators
   * @request GET:/oracle/validators/aggregate_prevotes
   */
  queryAggregatePrevotes = (params: RequestParams = {}) =>
    this.request<OracleQueryAggregatePrevotesResponse, RpcStatus>({
      path: `/oracle/validators/aggregate_prevotes`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryAggregateVotes
   * @summary AggregateVotes returns aggregate votes of all validators
   * @request GET:/oracle/validators/aggregate_votes
   */
  queryAggregateVotes = (params: RequestParams = {}) =>
    this.request<OracleQueryAggregateVotesResponse, RpcStatus>({
      path: `/oracle/validators/aggregate_votes`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryAggregatePrevote
   * @summary AggregatePrevote returns an aggregate prevote of a validator
   * @request GET:/oracle/validators/{validator_addr}/aggregate_prevote
   */
  queryAggregatePrevote = (
    validator_addr: string,
    params: RequestParams = {}
  ) =>
    this.request<OracleQueryAggregatePrevoteResponse, RpcStatus>({
      path: `/oracle/validators/${validator_addr}/aggregate_prevote`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryFeederDelegation
   * @summary FeederDelegation returns feeder delegation of a validator
   * @request GET:/oracle/validators/{validator_addr}/feeder
   */
  queryFeederDelegation = (
    validator_addr: string,
    params: RequestParams = {}
  ) =>
    this.request<OracleQueryFeederDelegationResponse, RpcStatus>({
      path: `/oracle/validators/${validator_addr}/feeder`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryMissCounter
   * @summary MissCounter returns oracle miss counter of a validator
   * @request GET:/oracle/validators/{validator_addr}/miss
   */
  queryMissCounter = (validator_addr: string, params: RequestParams = {}) =>
    this.request<OracleQueryMissCounterResponse, RpcStatus>({
      path: `/oracle/validators/${validator_addr}/miss`,
      method: "GET",
      format: "json",
      ...params,
    });
}
