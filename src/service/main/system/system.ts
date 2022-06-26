import xtRequest from "@/service"

export function getPageListdata(url: string, data: any) {
  return xtRequest.post({
    url: url,
    data: data
  })
}

export function deletePageData(url: string) {
  return xtRequest.delete({
    url
  })
}

export function createPageData(url: string, data: any) {
  return xtRequest.post({
    url: url,
    data: data
  })
}

export function editPageData(url: string, data: any) {
  return xtRequest.patch({
    url: url,
    data: data
  })
}
