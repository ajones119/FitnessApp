/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as MainImport } from './routes/main'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedRoute1Import } from './routes/_authenticated/route1'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const MainRoute = MainImport.update({
  id: '/main',
  path: '/main',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const AuthenticatedRoute1Route = AuthenticatedRoute1Import.update({
  id: '/route1',
  path: '/route1',
  getParentRoute: () => AuthenticatedRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/main': {
      id: '/main'
      path: '/main'
      fullPath: '/main'
      preLoaderRoute: typeof MainImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/route1': {
      id: '/_authenticated/route1'
      path: '/route1'
      fullPath: '/route1'
      preLoaderRoute: typeof AuthenticatedRoute1Import
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
  AuthenticatedRoute1Route: typeof AuthenticatedRoute1Route
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedRoute1Route: AuthenticatedRoute1Route,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '': typeof AuthenticatedRouteWithChildren
  '/main': typeof MainRoute
  '/route1': typeof AuthenticatedRoute1Route
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '': typeof AuthenticatedRouteWithChildren
  '/main': typeof MainRoute
  '/route1': typeof AuthenticatedRoute1Route
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/main': typeof MainRoute
  '/_authenticated/route1': typeof AuthenticatedRoute1Route
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '' | '/main' | '/route1'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/main' | '/route1'
  id: '__root__' | '/' | '/_authenticated' | '/main' | '/_authenticated/route1'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  MainRoute: typeof MainRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  MainRoute: MainRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authenticated",
        "/main"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/route1"
      ]
    },
    "/main": {
      "filePath": "main.tsx"
    },
    "/_authenticated/route1": {
      "filePath": "_authenticated/route1.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
